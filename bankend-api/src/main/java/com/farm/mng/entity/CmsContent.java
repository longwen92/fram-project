package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Date;

/**
 * 内容表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("cms_content")
public class CmsContent extends BaseEntity {
    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 摘要
     */
    private String summary;

    /**
     * 分类ID
     */
    private Long categoryId;

    /**
     * 作者
     */
    private String author;

    /**
     * 封面图
     */
    private String coverImage;

    /**
     * 浏览量
     */
    private Integer views;

    /**
     * 点赞数
     */
    private Integer likes;

    /**
     * 评论数
     */
    private Integer comments;

    /**
     * 状态: 0-草稿, 1-待审核, 2-已发布, 3-已拒绝
     */
    private Integer status;

    /**
     * 发布时间
     */
    private Date publishTime;

    /**
     * 分类信息 (非数据库字段)
     */
    @TableField(exist = false)
    private CmsCategory category;
}