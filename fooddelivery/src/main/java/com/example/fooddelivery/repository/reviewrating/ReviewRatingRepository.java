package com.example.fooddelivery.repository.reviewrating;

import com.example.fooddelivery.enumvalues.ReviewType;
import com.example.fooddelivery.model.reviewrating.ReviewRatingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRatingRepository extends JpaRepository<ReviewRatingModel,String>
{
    @Query("SELECT r.targetCode FROM ReviewRatingModel r WHERE r.reviewType = :type GROUP BY r.targetCode HAVING AVG(r.reviewRating) < 3.0")
    List<String> findLowRatedTargetCodes(@Param("type")ReviewType type);
}
