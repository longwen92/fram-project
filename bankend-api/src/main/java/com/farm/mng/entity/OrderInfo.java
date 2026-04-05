package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.util.List;

/**
 * 订单表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("order_info")
public class OrderInfo extends BaseEntity {
    /**
     * 订单编号
     */
    private String orderNo;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 订单总额
     */
    private BigDecimal totalAmount;

    /**
     * 优惠金额
     */
    private BigDecimal discountAmount;

    /**
     * 实付金额
     */
    private BigDecimal actualAmount;

    /**
     * 支付方式: 1-微信, 2-支付宝, 3-银行转账
     */
    private Integer paymentMethod;

    /**
     * 支付状态: 0-待支付, 1-已支付, 2-支付失败
     */
    private Integer paymentStatus;

    /**
     * 订单状态: pending_payment, pending_shipment, shipped, completed, cancelled
     */
    private String orderStatus;

    /**
     * 收货人
     */
    private String consignee;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 收货地址
     */
    private String address;

    /**
     * 备注
     */
    private String remark;

    /**
     * 用户信息 (非数据库字段)
     */
    @TableField(exist = false)
    private SysUser user;

    /**
     * 订单商品明细 (非数据库字段)
     */
    @TableField(exist = false)
    private List<OrderItem> items;
}