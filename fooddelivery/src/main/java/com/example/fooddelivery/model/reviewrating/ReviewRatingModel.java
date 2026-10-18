package com.example.fooddelivery.model.reviewrating;

import com.example.fooddelivery.enumvalues.ReviewType;
import jakarta.persistence.*;

@Entity
public class ReviewRatingModel
{
    @Id
    @Column(name = "review_code", nullable = false, updatable = false, unique = true)
    private String reviewCode;

    private String orderCode;
    private String customerCode;
    private String targetCode;

    @Enumerated(EnumType.STRING)
    private ReviewType reviewType;

    private Double reviewRating;
    private String reviewComment;

    public ReviewRatingModel()
    {
        super();
    }

    public ReviewRatingModel(String orderCode, String customerCode, String targetCode, ReviewType reviewType, Double reviewRating, String reviewComment) {
        this.orderCode = orderCode;
        this.customerCode = customerCode;
        this.targetCode = targetCode;
        this.reviewType = reviewType;
        this.reviewRating = reviewRating;
        this.reviewComment = reviewComment;
    }

    public String getReviewCode() {
        return reviewCode;
    }

    public void setReviewCode(String reviewCode) {
        this.reviewCode = reviewCode;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getTargetCode() {
        return targetCode;
    }

    public void setTargetCode(String targetCode) {
        this.targetCode = targetCode;
    }

    public ReviewType getReviewType() {
        return reviewType;
    }

    public void setReviewType(ReviewType reviewType) {
        this.reviewType = reviewType;
    }

    public Double getReviewRating() {
        return reviewRating;
    }

    public void setReviewRating(Double reviewRating) {
        this.reviewRating = reviewRating;
    }

    public String getReviewComment() {
        return reviewComment;
    }

    public void setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }
}
