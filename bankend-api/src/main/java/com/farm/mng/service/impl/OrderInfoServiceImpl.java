package com.farm.mng.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.farm.mng.entity.OrderInfo;
import com.farm.mng.mapper.OrderInfoMapper;
import com.farm.mng.service.IOrderInfoService;
import org.springframework.stereotype.Service;

/**
 * 订单服务实现
 */
@Service
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements IOrderInfoService {
}