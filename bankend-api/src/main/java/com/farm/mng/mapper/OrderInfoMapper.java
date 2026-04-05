package com.farm.mng.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.farm.mng.entity.OrderInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单Mapper
 */
@Mapper
public interface OrderInfoMapper extends BaseMapper<OrderInfo> {
}