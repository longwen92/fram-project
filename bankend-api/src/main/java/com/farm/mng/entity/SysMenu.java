package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

/**
 * 系统菜单表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_menu")
public class SysMenu extends BaseEntity {
    /**
     * 父菜单ID
     */
    private Long parentId;

    /**
     * 菜单名称
     */
    private String menuName;

    /**
     * 菜单类型: 1-目录, 2-菜单, 3-按钮
     */
    private Integer menuType;

    /**
     * 路由地址
     */
    private String path;

    /**
     * 组件路径
     */
    private String component;

    /**
     * 图标
     */
    private String icon;

    /**
     * 排序
     */
    private Integer sortOrder;

    /**
     * 是否显示: 0-隐藏, 1-显示
     */
    private Integer visible;

    /**
     * 状态: 0-禁用, 1-启用
     */
    private Integer status;

    /**
     * 权限标识
     */
    private String perms;

    /**
     * 子菜单列表 (非数据库字段)
     */
    @TableField(exist = false)
    private List<SysMenu> children;
}