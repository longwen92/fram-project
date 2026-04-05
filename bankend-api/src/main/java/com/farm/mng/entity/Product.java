package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 商品表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("product")
public class Product extends BaseEntity {
    /**
     * 商品名称
     */
    private String productName;

    /**
     * 商品编码
     */
    private String productCode;

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
    private Integer stock;

    /**
     * 单位
     */
    private String unit;

    /**
     * 产地
     */
    private String origin;

    /**
     * 描述
     */
    private String description;

    /**
     * 图片(JSON数组)
     */
    private String images;

    /**
     * 状态: 1-已发布, 2-缺货, 3-待审核, 4-下架
     */
    private Integer status;

    /**
     * 排序
     */
    private Integer sortOrder;

    /**
     * 分类信息 (非数据库字段)
     */
    @TableField(exist = false)
    private ProductCategory category;
}