package rabbit

import (
	"encoding/json"
	"log"
	"os"
	"time"

	"worker-go/internal/models"

	amqp "github.com/rabbitmq/amqp091-go"
)

type MessageHandler func(data models.WeatherPayload) error

func Consume(conn *amqp.Connection, handler MessageHandler) error {
	ch, err := conn.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	queueName := os.Getenv("RABBITMQ_QUEUE")
	if queueName == "" {
		queueName = "weather_queue"
		log.Println("⚠️  Variável RABBITMQ_QUEUE não definida, usando padrão:", queueName)
	}

	// 🔧 Declara a fila antes de consumir (idempotente)
	_, err = ch.QueueDeclare(
		queueName, // nome da fila
		true,      // durable
		false,     // autoDelete
		false,     // exclusive
		false,     // noWait
		nil,       // args
	)
	if err != nil {
		log.Printf("Erro ao declarar fila %s: %v\n", queueName, err)
		return err
	}

	log.Printf("✅ Fila '%s' pronta, aguardando mensagens...\n", queueName)

	// 🔁 Tenta consumir com retentativas (caso o broker ainda esteja inicializando)
	var msgs <-chan amqp.Delivery
	for i := 0; i < 5; i++ {
		msgs, err = ch.Consume(
			queueName,
			"go-worker",
			false, // autoAck
			false, // exclusive
			false, // noLocal
			false, // noWait
			nil,
		)
		if err == nil {
			break
		}

		log.Printf("⚠️  Falha ao consumir fila '%s': %v (tentativa %d/5)\n", queueName, err, i+1)
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		log.Fatalf("❌ Não foi possível consumir da fila '%s' após 5 tentativas: %v", queueName, err)
		return err
	}

	// ✅ Loop de consumo
	for msg := range msgs {
		var data models.WeatherPayload

		if err := json.Unmarshal(msg.Body, &data); err != nil {
			log.Println("⚠️  Erro ao decodificar JSON:", err)
			msg.Nack(false, false)
			continue
		}

		if err := handler(data); err != nil {
			log.Println("⚠️  Erro ao processar mensagem:", err)
			msg.Nack(false, true)
			continue
		}

		msg.Ack(false)
	}

	return nil
}
