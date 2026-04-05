package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

/**
 * 权限表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_permission")
public class SysPermission extends BaseEntity {
    /**
     * 父权限ID
     */
    private Long parentId;

    /**
     * 权限名称
     */
    private String permissionName;

    /**
     * 权限标识
     */
    private String permissionCode;

    /**
     * 类型: 1-菜单, 2-按钮, 3-接口
     */
    private Integer permissionType;

    /**
     * 路由路径
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
     * 是否可见: 0-隐藏, 1-显示
     */
    private Integer visible;

    /**
     * 状态: 0-禁用, 1-启用
     */
    private Integer status;

    /**
     * 子权限列表 (非数据库字段)
     */
    @TableField(exist = false)
    private List<SysPermission> children;
}