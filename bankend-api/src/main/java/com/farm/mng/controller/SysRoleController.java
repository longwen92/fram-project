package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.SysRole;
import com.farm.mng.service.ISysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 系统角色控制器
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleController {

    @Autowired
    private ISysRoleService sysRoleService;

    @GetMapping("/{id}")
    public Result<SysRole> getById(@PathVariable Long id) {
        SysRole role = sysRoleService.getById(id);
        return Result.success(role);
    }

    @GetMapping("/page")
    public Result<PageResult<SysRole>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                            @RequestParam(defaultValue = "10") Integer pageSize,
                                            @RequestParam(required = false) String roleName,
                                            @RequestParam(required = false) String roleCode,
                                            @RequestParam(required = false) Integer status) {
        Page<SysRole> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<SysRole> wrapper = new LambdaQueryWrapper<>();
        if (roleName != null && !roleName.trim().isEmpty()) {
            wrapper.like(SysRole::getRoleName, roleName);
        }
        if (roleCode != null && !roleCode.trim().isEmpty()) {
            wrapper.like(SysRole::getRoleCode, roleCode);
        }
        if (status != null) {
            wrapper.eq(SysRole::getStatus, status);
        }
        wrapper.orderByDesc(SysRole::getCreateTime);
        IPage<SysRole> result = sysRoleService.page(page, wrapper);
        PageResult<SysRole> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @GetMapping("/list")
    public Result<List<SysRole>> list(@RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<SysRole> wrapper = new LambdaQueryWrapper<>();
        if (status != null) {
            wrapper.eq(SysRole::getStatus, status);
        }
        wrapper.orderByDesc(SysRole::getCreateTime);
        List<SysRole> list = sysRoleService.list(wrapper);
        return Result.success(list);
    }

    @PostMapping
    public Result<Void> save(@RequestBody SysRole role) {
        sysRoleService.save(role);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody SysRole role) {
        sysRoleService.updateById(role);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysRoleService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        sysRoleService.removeByIds(ids);
        return Result.success();
    }
}