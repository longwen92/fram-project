package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.OrderInfo;
import com.farm.mng.service.IOrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 订单控制器
 */
@RestController
@RequestMapping("/order")
public class OrderInfoController {

    @Autowired
    private IOrderInfoService orderInfoService;

    @GetMapping("/{id}")
    public Result<OrderInfo> getById(@PathVariable Long id) {
        OrderInfo order = orderInfoService.getById(id);
        return Result.success(order);
    }

    @GetMapping("/page")
    public Result<PageResult<OrderInfo>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                              @RequestParam(defaultValue = "10") Integer pageSize,
                                              @RequestParam(required = false) String orderNo,
                                              @RequestParam(required = false) Long userId,
                                              @RequestParam(required = false) String orderStatus,
                                              @RequestParam(required = false) Integer paymentStatus) {
        Page<OrderInfo> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<OrderInfo> wrapper = new LambdaQueryWrapper<>();
        if (orderNo != null && !orderNo.trim().isEmpty()) {
            wrapper.like(OrderInfo::getOrderNo, orderNo);
        }
        if (userId != null) {
            wrapper.eq(OrderInfo::getUserId, userId);
        }
        if (orderStatus != null && !orderStatus.trim().isEmpty()) {
            wrapper.eq(OrderInfo::getOrderStatus, orderStatus);
        }
        if (paymentStatus != null) {
            wrapper.eq(OrderInfo::getPaymentStatus, paymentStatus);
        }
        wrapper.orderByDesc(OrderInfo::getCreateTime);
        IPage<OrderInfo> result = orderInfoService.page(page, wrapper);
        PageResult<OrderInfo> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @PostMapping
    public Result<Void> save(@RequestBody OrderInfo order) {
        orderInfoService.save(order);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody OrderInfo order) {
        orderInfoService.updateById(order);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        orderInfoService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        orderInfoService.removeByIds(ids);
        return Result.success();
    }
}