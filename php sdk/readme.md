# PSCB Acquiring PHP SDK

## Требования

PHP 8.0+

## Общая информация

SDK включает 2 базовых компонента, которые предназначены для следующих целей:

- `SDK_PayModul` - методы работы с платежами
- `SDK_Callback` - обработка нотификаций

Для работы с SDK вам понадобятся:

- marketPlace - идентификатор магазина
- secretKey – секретный ключ, используемый для авторизации

Параметры marketPlace и secretKey доступны в [Кабинете мерчанта](https://oos.pscb.ru/admin/index) в разделе "Профиль".

### Структура компонента SDK

| Файл/каталог | Описание |
| --- | --- |
| README.md | Cодержит информацию про доступные для передачи параметры в методы класса | 
| events | Отображает ответы и результаты выполнения от API (путь хранения выбирается самостоятельно) |
| logs | Отображает ответы и результаты выполнения от SDK (путь хранения выбирается самостоятельно) |
| Src |	Каталог с исходными кодами SDK |


### Список поддерживаемых методов

Доступные методы - to do

## Методы работы с платежами

### Вызов платежной формы

#### Пример вызова платежной формы

```php
<?php

//Подключение библиотеки
include 'payment.class.php';
//Основные параметры платежа
$data = array(
    "marketPlace" => 47607,
    "secretKey" => 'oos_test@pscb.ru',
    "orderId" => 2000,
    "request_url"=>" https://oosdemo.pscb.ru/cabinet/payments ", //URL кабинета
);
//Параметры для чека
$products = array(
    array(
        "object" => 'Товар1',
        "quantity" => 1,
        "price" => 2,
        "amount" => 2
    ),
);
//Указание путей для сохранения логов и событий
//Вместо logs и events установите свои путь для сохранения, например /var/log 
$M = new SetWay();
$M->SetLogsAndEvensWay('logs','events'); 
//Создание экземпляра платежной формы и ее запуск
$PayForm = new ClassPay($data);
$PayForm->CreatePayment($products);
?>
```

### Создание платежа СБП

to do

### Подтверждение платежа картой

to do

### Отмена платежа картой

to do

### Возврат платежа

to do

## Обработка нотификаций

### Общая информация

Сценарий работы - to do

### Подключение 

to do

### Примеры использования

to do

## Вопросы и ответы

Вопросы и ответы - to do

<!-- ### Задание основных параметров платежа

```php
$data = array(
    "marketPlace" => 47607,
    "secretKey" => '111111',
    "orderId" => "order-20250101",
    "request_url"=>" https://oos.pscb.ru", // https://oos.pscb.ru - prod, https://oosdemo.pscb.ru - test
);
```

### Задание позиций чека

```php
$products = array(
    array(
        "object" => 'Товар1',
        "quantity" => 1,
        "price" => 2,
        "amount" => 2
    ),
);
```

### Задание путей для сохранения логов и событий

```php
//Вместо logs и events установите свои путь для сохранения, например /var/log 
$M = new SetWay();
$M->SetLogsAndEvensWay('logs','events'); 
```

### Создание экземпляра платежной формы и ее запуск

```php
$PayForm = new ClassPay($data);
$PayForm->CreatePayment($products);
?>
``` -->


