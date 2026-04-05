package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.SysPermission;
import com.farm.mng.service.ISysPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 系统权限控制器
 */
@RestController
@RequestMapping("/sys/permission")
public class SysPermissionController {

    @Autowired
    private ISysPermissionService sysPermissionService;

    @GetMapping("/{id}")
    public Result<SysPermission> getById(@PathVariable Long id) {
        SysPermission permission = sysPermissionService.getById(id);
        return Result.success(permission);
    }

    @GetMapping("/page")
    public Result<PageResult<SysPermission>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                                  @RequestParam(defaultValue = "10") Integer pageSize,
                                                  @RequestParam(required = false) String name,
                                                  @RequestParam(required = false) String code,
                                                  @RequestParam(required = false) Integer type) {
        Page<SysPermission> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<SysPermission> wrapper = new LambdaQueryWrapper<>();
        if (name != null && !name.trim().isEmpty()) {
            wrapper.like(SysPermission::getPermissionName, name);
        }
        if (code != null && !code.trim().isEmpty()) {
            wrapper.like(SysPermission::getPermissionCode, code);
        }
        if (type != null) {
            wrapper.eq(SysPermission::getPermissionType, type);
        }
        wrapper.orderByAsc(SysPermission::getSortOrder);
        IPage<SysPermission> result = sysPermissionService.page(page, wrapper);
        PageResult<SysPermission> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @GetMapping("/list")
    public Result<List<SysPermission>> list(@RequestParam(required = false) Integer type) {
        LambdaQueryWrapper<SysPermission> wrapper = new LambdaQueryWrapper<>();
        if (type != null) {
            wrapper.eq(SysPermission::getType, type);
        }
        wrapper.orderByAsc(SysPermission::getSortOrder);
        List<SysPermission> list = sysPermissionService.list(wrapper);
        return Result.success(list);
    }

    @PostMapping
    public Result<Void> save(@RequestBody SysPermission permission) {
        sysPermissionService.save(permission);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody SysPermission permission) {
        sysPermissionService.updateById(permission);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysPermissionService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        sysPermissionService.removeByIds(ids);
        return Result.success();
    }
}