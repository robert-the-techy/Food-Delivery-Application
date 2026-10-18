package com.example.fooddelivery.model.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateModifier
{
    public static String dateModifier(LocalDateTime dateTime)
    {
        if(dateTime == null)
        {
            return "N/A";
        }

        LocalDate today = LocalDate.now();
        LocalDate givenDate = dateTime.toLocalDate();

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        String time = dateTime.format(timeFormatter).toUpperCase();

        if(givenDate.isEqual(today))
        {
            return "today " + time;
        } else if(givenDate.isEqual(today.minusDays(1)))
        {
            return "yesterday " + time;
        }
        else
        {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd, MMM");
            String datePart = dateTime.format(dateFormatter);
            return datePart + " " + time;
        }
    }
}
