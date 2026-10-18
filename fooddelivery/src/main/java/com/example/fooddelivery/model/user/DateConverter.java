package com.example.fooddelivery.model.user;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateConverter
{
    private static final DateTimeFormatter INPUT_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter OUT_FORMAT = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public static String dateConversion(String userDOB)
    {
        LocalDate DOB = LocalDate.parse(userDOB,INPUT_FORMAT);
        return DOB.format(OUT_FORMAT);
    }
}
