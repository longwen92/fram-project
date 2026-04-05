package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 采购表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("purchase")
public class Purchase extends BaseEntity {
    /**
     * 采购需求
     */
    private String purchaseName;

    /**
     * 分类ID
     */
    private Long categoryId;

    /**
     * 最低预算
     */
    private BigDecimal budgetMin;

    /**
     * 最高预算
     */
    private BigDecimal budgetMax;

    /**
     * 需求量
     */
    private BigDecimal quantity;

    /**
     * 单位
     */
    private String unit;

    /**
     * 期望产地
     */
    private String origin;

    /**
     * 采购商
     */
    private String buyer;

    /**
     * 描述
     */
    private String description;

    /**
     * 是否紧急: 0-否, 1-是
     */
    private Integer urgent;

    /**
     * 状态: 1-进行中, 2-待审核, 3-已关闭
     */
    private Integer status;

    /**
     * 分类信息 (非数据库字段)
     */
    @TableField(exist = false)
    private ProductCategory category;
}