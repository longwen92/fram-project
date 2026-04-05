package com.farm.mng.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.farm.mng.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

/**
 * 角色表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_role")
public class SysRole extends BaseEntity {
    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色编码
     */
    private String roleCode;

    /**
     * 描述
     */
    private String description;

    /**
     * 数据权限范围: 1-全部, 2-本部门, 3-本部门及子部门, 4-仅本人
     */
    private Integer dataScope;

    /**
     * 状态: 0-禁用, 1-启用
     */
    private Integer status;

    /**
     * 排序
     */
    private Integer sortOrder;

    /**
     * 权限列表 (非数据库字段)
     */
    @TableField(exist = false)
    private List<SysPermission> permissions;

    /**
     * 菜单列表 (非数据库字段)
     */
    @TableField(exist = false)
    private List<SysMenu> menus;
}