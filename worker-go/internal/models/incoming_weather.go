package models


type IncomingWeather struct {
	Source     string    `json:"source"`
	Location   Location  `json:"location"`
	ObservedAt string    `json:"observed_at"`

	TemperatureC             *float64 `json:"temperature_c"`
	HumidityPercent          *float64 `json:"humidity_percent"`
	WindSpeedMS              *float64 `json:"wind_speed_m_s"`
	WindDirectionDeg         *float64 `json:"wind_direction_deg"`
	CloudCoverPercent        *float64 `json:"cloud_cover_percent"`
	PrecipitationProbability *float64 `json:"precipitation_probability"`

	Raw struct {
		CurrentWeather struct {
			Time          string  `json:"time"`
			Temperature   float64 `json:"temperature"`
			Windspeed     float64 `json:"windspeed"`
			Winddirection float64 `json:"winddirection"`
		} `json:"current_weather"`

		Hourly struct {
			Time                     []string  `json:"time"`
			Temperature2m            []float64 `json:"temperature_2m"`
			RelativeHumidity2m       []float64 `json:"relativehumidity_2m"`
			CloudCover               []float64 `json:"cloudcover"`
			PrecipitationProbability []float64 `json:"precipitation_probability"`
		} `json:"hourly"`

		Daily struct {
			Time          []string  `json:"time"`
			TemperatureMin []float64 `json:"temperature_2m_min"`
			TemperatureMax []float64 `json:"temperature_2m_max"`
		} `json:"daily"`
	} `json:"raw"`
}
