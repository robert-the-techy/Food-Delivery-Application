package com.example.fooddelivery.model.order;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class OrderIdGenerator implements IdentifierGenerator
{

    @Override
    public Object generate(SharedSessionContractImplementor session, Object obj)
    {
        session.createNativeQuery("update order_seq set next_val = LAST_INSERT_ID(next_val + 1)").executeUpdate();
        Number next = (Number) session.createNativeQuery("select LAST_INSERT_ID()").getSingleResult();
        return "OR" + next.longValue();
    }
}