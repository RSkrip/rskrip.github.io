# PSCB Acquiring PHP SDK

## Требования

PHP 8.0+

## Общая информация

SDK включает 2 базовых компонента, которые предназначены для следующих целей:

- SDK_PayModul - добавить описание - to do
- SDK_Callback - обработка нотификаций

### Структура компонента SDK

Структура библиотеки SDK - to do

### Список поддерживаемых методов

Доступные методы - to do

## SDK_PayModul

### Общая информация

Сценарий работы - to do

### Подключение 

Подключение библиотеки в проект:

```php
include 'payment.class.php'; 
```

Для работы с SDK вам понадобятся:

- marketPlace - идентификатор магазина
- secretKey – секретный ключ, используемый для авторизации

Параметры marketPlace и secretKey доступны в [Кабинете мерчанта](https://oos.pscb.ru/admin/index) в разделе "Профиль".

### Примеры использования

to do

## SDK_Callback

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


