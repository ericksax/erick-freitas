package mapper

import (
	"worker-go/internal/models"
)

func ToWeatherPayload(in models.IncomingWeather) models.WeatherPayload {
	return models.WeatherPayload{
		Source:     in.Source,
		Location:   in.Location,
		ObservedAt: in.ObservedAt,

		TemperatureC:             in.TemperatureC,
		HumidityPercent:          in.HumidityPercent,
		WindSpeedMS:              in.WindSpeedMS,
		WindDirectionDeg:         in.WindDirectionDeg,
		CloudCoverPercent:        in.CloudCoverPercent,
		PrecipitationProbability: in.PrecipitationProbability,

		CurrentWeather: models.CurrentWeather{
			Time:          in.Raw.CurrentWeather.Time,
			Temperature:   in.Raw.CurrentWeather.Temperature,
			Windspeed:     in.Raw.CurrentWeather.Windspeed,
			Winddirection: in.Raw.CurrentWeather.Winddirection,
		},

		Hourly: models.Hourly{
			Time:                     in.Raw.Hourly.Time,
			Temperature2m:            in.Raw.Hourly.Temperature2m,
			RelativeHumidity2m:       in.Raw.Hourly.RelativeHumidity2m,
			CloudCover:               in.Raw.Hourly.CloudCover,
			PrecipitationProbability: in.Raw.Hourly.PrecipitationProbability,
		},

		Daily: models.Daily{
			Time:           in.Raw.Daily.Time,
			TemperatureMin: in.Raw.Daily.TemperatureMin,
			TemperatureMax: in.Raw.Daily.TemperatureMax,
		},
	}
}
