package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.SysMenu;
import com.farm.mng.service.ISysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 系统菜单控制器
 */
@RestController
@RequestMapping("/sys/menu")
public class SysMenuController {

    @Autowired
    private ISysMenuService sysMenuService;

    @GetMapping("/{id}")
    public Result<SysMenu> getById(@PathVariable Long id) {
        SysMenu menu = sysMenuService.getById(id);
        return Result.success(menu);
    }

    @GetMapping("/page")
    public Result<PageResult<SysMenu>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                            @RequestParam(defaultValue = "10") Integer pageSize,
                                            @RequestParam(required = false) String menuName,
                                            @RequestParam(required = false) Integer menuType,
                                            @RequestParam(required = false) Integer status) {
        Page<SysMenu> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<SysMenu> wrapper = new LambdaQueryWrapper<>();
        if (menuName != null && !menuName.trim().isEmpty()) {
            wrapper.like(SysMenu::getMenuName, menuName);
        }
        if (menuType != null) {
            wrapper.eq(SysMenu::getMenuType, menuType);
        }
        if (status != null) {
            wrapper.eq(SysMenu::getStatus, status);
        }
        wrapper.orderByAsc(SysMenu::getSortOrder);
        IPage<SysMenu> result = sysMenuService.page(page, wrapper);
        PageResult<SysMenu> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), (int) result.getCurrent(), (int) result.getSize());
        return Result.success(pageResult);
    }

    @GetMapping("/list")
    public Result<List<SysMenu>> list(@RequestParam(required = false) Integer menuType,
                                      @RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<SysMenu> wrapper = new LambdaQueryWrapper<>();
        if (menuType != null) {
            wrapper.eq(SysMenu::getMenuType, menuType);
        }
        if (status != null) {
            wrapper.eq(SysMenu::getStatus, status);
        }
        wrapper.orderByAsc(SysMenu::getSortOrder);
        List<SysMenu> list = sysMenuService.list(wrapper);
        return Result.success(list);
    }

    @GetMapping("/tree")
    public Result<List<SysMenu>> tree(@RequestParam(required = false) Integer menuType,
                                      @RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<SysMenu> wrapper = new LambdaQueryWrapper<>();
        if (menuType != null) {
            wrapper.eq(SysMenu::getMenuType, menuType);
        }
        if (status != null) {
            wrapper.eq(SysMenu::getStatus, status);
        }
        wrapper.orderByAsc(SysMenu::getSortOrder);
        List<SysMenu> allMenus = sysMenuService.list(wrapper);
        // 构建树形结构
        List<SysMenu> tree = buildTree(allMenus, 0L);
        return Result.success(tree);
    }

    @GetMapping("/tree/current")
    public Result<List<SysMenu>> currentUserTree() {
        // TODO: 根据当前用户角色过滤菜单
        // 暂时返回所有启用的菜单
        LambdaQueryWrapper<SysMenu> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysMenu::getStatus, 1); // 启用状态
        wrapper.orderByAsc(SysMenu::getSortOrder);
        List<SysMenu> allMenus = sysMenuService.list(wrapper);
        List<SysMenu> tree = buildTree(allMenus, 0L);
        return Result.success(tree);
    }

    private List<SysMenu> buildTree(List<SysMenu> menus, Long parentId) {
        return menus.stream()
                .filter(menu -> parentId.equals(menu.getParentId()))
                .peek(menu -> menu.setChildren(buildTree(menus, menu.getId())))
                .collect(Collectors.toList());
    }

    @PostMapping
    public Result<Void> save(@RequestBody SysMenu menu) {
        sysMenuService.save(menu);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody SysMenu menu) {
        sysMenuService.updateById(menu);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysMenuService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        sysMenuService.removeByIds(ids);
        return Result.success();
    }
}