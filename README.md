# Bookings API (Node.js)
## Simple booking api made with Node.js

Реализован <b>POST</b> маршрут `/api/bookings/reserve` в <a href="https://github.com/M1estere/bookings-api-node/edit/main/controllers/bookingsController.js">bookingsController</a>, тело запроса должно иметь вид:
        
        {
          "event_id": 1,
          "user_id": "user123"
        }

Пример ответа при бронировании\
<img width="391" height="170" alt="image" src="https://github.com/user-attachments/assets/d100a0cf-a4ac-45d5-adfd-c6db3ba55649" />

Также для просмотра всех броней был добавлен <b>GET</b> маршрут `/api/bookings`\
Пример ответа\
<img width="425" height="255" alt="image" src="https://github.com/user-attachments/assets/e0becccf-cc1e-4bb7-9a56-85405454b552" />

Для теста были добавлены два события\
<img width="346" height="121" alt="image" src="https://github.com/user-attachments/assets/8356061c-4fab-40f3-8bae-aa41b67cc7a9" />

Выборка из базы данных после добавления одной брони\
<img width="513" height="101" alt="image" src="https://github.com/user-attachments/assets/7c8d6dfe-53b4-4411-8516-6f73840b1c82" />

Для тестирования функционала использовалась программа <b>Postman</b>

