<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$result = mail(
    "maqsood@tmtconsultancy.com",
    "Test Email",
    "This is a test email."
);

var_dump($result);