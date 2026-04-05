package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 供应表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("supply")
public class Supply extends BaseEntity {
    /**
     * 供应商品
     */
    private String supplyName;

    /**
     * 分类ID
     */
    private Long categoryId;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 库存
     */
    private BigDecimal stock;

    /**
     * 单位
     */
    private String unit;

    /**
     * 产地
     */
    private String origin;

    /**
     * 供应商
     */
    private String supplier;

    /**
     * 描述
     */
    private String description;

    /**
     * 图片
     */
    private String images;

    /**
     * 状态: 1-已发布, 2-待审核, 3-缺货, 4-下架
     */
    private Integer status;

    /**
     * 分类信息 (非数据库字段)
     */
    @TableField(exist = false)
    private ProductCategory category;
}