package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.SysUser;
import com.farm.mng.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 系统用户控制器
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController {

    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/{id}")
    public Result<SysUser> getById(@PathVariable Long id) {
        SysUser user = sysUserService.getById(id);
        return Result.success(user);
    }

    @GetMapping("/page")
    public Result<PageResult<SysUser>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                            @RequestParam(defaultValue = "10") Integer pageSize,
                                            @RequestParam(required = false) String username,
                                            @RequestParam(required = false) String realName,
                                            @RequestParam(required = false) Integer status) {
        Page<SysUser> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.trim().isEmpty()) {
            wrapper.like(SysUser::getUsername, username);
        }
        if (realName != null && !realName.trim().isEmpty()) {
            wrapper.like(SysUser::getRealName, realName);
        }
        if (status != null) {
            wrapper.eq(SysUser::getStatus, status);
        }
        wrapper.orderByDesc(SysUser::getCreateTime);
        IPage<SysUser> result = sysUserService.page(page, wrapper);
        PageResult<SysUser> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @PostMapping
    public Result<Void> save(@RequestBody SysUser user) {
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        sysUserService.save(user);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody SysUser user) {
        // 更新时密码单独处理，避免清空
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            // 保持原密码
            SysUser oldUser = sysUserService.getById(user.getId());
            if (oldUser != null) {
                user.setPassword(oldUser.getPassword());
            }
        }
        sysUserService.updateById(user);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysUserService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        sysUserService.removeByIds(ids);
        return Result.success();
    }
}