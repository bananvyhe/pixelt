if Rails.env.development?
  APP_CONFIG = {
    environment: "development",
    apiUrl: "http://localhost:3000",  
  }
elsif Rails.env.production?
  APP_CONFIG = {
    environment: "production",
    apiUrl: "https://pixeltech.ru",  
  }
end