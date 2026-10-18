package com.example.fooddelivery.enumvalues;

public enum DeliveryPartnerRatings
{
    One(1.0),
    OneAndHalf(1.5),
    Two(2.0),
    TwoAndHalf(2.5),
    Three(3.0),
    ThreeAndHalf(3.5),
    Four(4.0),
    FourAndHalf(4.5),
    Five(5.0);

    private final double rating;

    private DeliveryPartnerRatings(double rating)
    {
        this.rating = rating;
    }

    public double getRating()
    {
        return this.rating;
    }
}
