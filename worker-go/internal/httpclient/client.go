package httpclient

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func PostJSON(url string, body any) (*http.Response, error) {
	jsonData, err := json.Marshal(body)
	if err != nil {
		log.Printf("[Go] ERRO ao serializar JSON: %v", err)
		log.Printf("[Go] Body problemático: %#v", body)
		return nil, err
	}


	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Printf("[Go] ERRO ao criar requisição: %v", err)
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Printf("[Go] ERRO DE REDE (connection refused, timeout, etc): %v", err)
		return nil, err
	}

	// Leitura do body de resposta SEMPRE
	respBody, _ := io.ReadAll(resp.Body)
	resp.Body.Close()

	// Se não for 2xx, retornar erro
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return resp, fmt.Errorf("NestJS retornou status %d: %s",
			resp.StatusCode, string(respBody))
	}

	return resp, nil
}
