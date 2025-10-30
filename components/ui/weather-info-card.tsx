'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Eye } from 'lucide-react';

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

export interface WeatherForecast {
  day: string;
  temp: number;
  condition: WeatherCondition;
}

export interface WeatherInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  location: string;
  currentTemp: number;
  condition: WeatherCondition;
  forecast?: WeatherForecast[];
  humidity?: number;
  visibility?: string;
  windSpeed?: string;
  unit?: 'C' | 'F';
}

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  sunny: <Sun className="h-12 w-12 text-amber-400" />,
  cloudy: <Cloud className="h-12 w-12 text-slate-400" />,
  rainy: <CloudRain className="h-12 w-12 text-blue-400" />,
  snowy: <CloudSnow className="h-12 w-12 text-cyan-300" />,
  windy: <Wind className="h-12 w-12 text-slate-500" />,
};

const weatherLabels: Record<WeatherCondition, string> = {
  sunny: '맑음',
  cloudy: '흐림',
  rainy: '비',
  snowy: '눈',
  windy: '바람',
};

const smallWeatherIcons: Record<WeatherCondition, React.ReactNode> = {
  sunny: <Sun className="h-6 w-6 text-amber-400" />,
  cloudy: <Cloud className="h-6 w-6 text-slate-400" />,
  rainy: <CloudRain className="h-6 w-6 text-blue-400" />,
  snowy: <CloudSnow className="h-6 w-6 text-cyan-300" />,
  windy: <Wind className="h-6 w-6 text-slate-500" />,
};

export const WeatherInfoCard = React.forwardRef<HTMLDivElement, WeatherInfoCardProps>(
  (
    {
      location,
      currentTemp,
      condition,
      forecast = [],
      humidity,
      visibility,
      windSpeed,
      unit = 'C',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn('p-4', className)} {...props}>
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-900">{location}</h3>
        </div>

        {/* Current Weather */}
        <div className="flex items-center gap-3 mb-3">
          {weatherIcons[condition]}
          <div>
            <p className="text-3xl font-bold text-slate-900">
              {currentTemp}°{unit}
            </p>
            <p className="text-xs text-slate-600">{weatherLabels[condition]}</p>
          </div>
        </div>

        {/* Additional Info */}
        {(humidity !== undefined || visibility || windSpeed) && (
          <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-slate-200">
            {humidity !== undefined && (
              <div className="flex flex-col items-center text-center">
                <Droplets className="h-3.5 w-3.5 text-slate-500 mb-1" />
                <span className="text-xs font-medium text-slate-900">{humidity}%</span>
              </div>
            )}
            {windSpeed && (
              <div className="flex flex-col items-center text-center">
                <Wind className="h-3.5 w-3.5 text-slate-500 mb-1" />
                <span className="text-xs font-medium text-slate-900">{windSpeed}</span>
              </div>
            )}
            {visibility && (
              <div className="flex flex-col items-center text-center">
                <Eye className="h-3.5 w-3.5 text-slate-500 mb-1" />
                <span className="text-xs font-medium text-slate-900">{visibility}</span>
              </div>
            )}
          </div>
        )}

        {/* Forecast */}
        {forecast.length > 0 && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              {forecast.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50"
                >
                  <p className="text-xs text-slate-600">{item.day}</p>
                  {smallWeatherIcons[item.condition]}
                  <p className="text-xs font-semibold text-slate-900">
                    {item.temp}°{unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }
);

WeatherInfoCard.displayName = 'WeatherInfoCard';
