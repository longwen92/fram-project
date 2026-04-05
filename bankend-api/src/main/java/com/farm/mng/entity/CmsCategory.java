package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

/**
 * 内容分类表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("cms_category")
public class CmsCategory extends BaseEntity {
    /**
     * 父分类ID
     */
    private Long parentId;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 分类编码
     */
    private String categoryCode;

    /**
     * 描述
     */
    private String description;

    /**
     * 图标
     */
    private String icon;

    /**
     * 排序
     */
    private Integer sortOrder;

    /**
     * 状态: 0-禁用, 1-启用
     */
    private Integer status;

    /**
     * 子分类列表 (非数据库字段)
     */
    @TableField(exist = false)
    private List<CmsCategory> children;
}