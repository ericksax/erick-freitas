package httpclient

import (
	"errors"
	"log"
	"net/http"
	"os"
	"time"

	"worker-go/internal/models"
)

func SendWeatherData(data models.WeatherPayload) error {
	url := os.Getenv("NEST_API_URL")

	var (
		err  error
		resp *http.Response
	)

	// Retry básico: 3 tentativas com 2s entre cada
	for i := 1; i <= 3; i++ {
		resp, err = PostJSON(url, data)
		if err == nil && resp.StatusCode < 400 {
			log.Println("Enviado para NestJS com sucesso!")
			return nil
		}

		log.Printf("[Retry %d/3] Erro ao enviar para NestJS: %v", i, err)
		time.Sleep(2 * time.Second)
	}

	return errors.New("falha após 3 tentativas ao enviar para NestJS")
}
