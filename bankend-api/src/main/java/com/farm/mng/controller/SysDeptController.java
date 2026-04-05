package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.SysDept;
import com.farm.mng.service.ISysDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 部门控制器
 */
@RestController
@RequestMapping("/sys/dept")
public class SysDeptController {

    @Autowired
    private ISysDeptService sysDeptService;

    @GetMapping("/{id}")
    public Result<SysDept> getById(@PathVariable Long id) {
        SysDept dept = sysDeptService.getById(id);
        return Result.success(dept);
    }

    @GetMapping("/page")
    public Result<PageResult<SysDept>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                            @RequestParam(defaultValue = "10") Integer pageSize,
                                            @RequestParam(required = false) String deptName,
                                            @RequestParam(required = false) String deptCode,
                                            @RequestParam(required = false) Integer status) {
        Page<SysDept> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<SysDept> wrapper = new LambdaQueryWrapper<>();
        if (deptName != null && !deptName.trim().isEmpty()) {
            wrapper.like(SysDept::getDeptName, deptName);
        }
        if (deptCode != null && !deptCode.trim().isEmpty()) {
            wrapper.like(SysDept::getDeptCode, deptCode);
        }
        if (status != null) {
            wrapper.eq(SysDept::getStatus, status);
        }
        wrapper.orderByAsc(SysDept::getSortOrder);
        IPage<SysDept> result = sysDeptService.page(page, wrapper);
        PageResult<SysDept> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @GetMapping("/list")
    public Result<List<SysDept>> list(@RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<SysDept> wrapper = new LambdaQueryWrapper<>();
        if (status != null) {
            wrapper.eq(SysDept::getStatus, status);
        }
        wrapper.orderByAsc(SysDept::getSortOrder);
        List<SysDept> list = sysDeptService.list(wrapper);
        return Result.success(list);
    }

    @GetMapping("/tree")
    public Result<List<SysDept>> tree(@RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<SysDept> wrapper = new LambdaQueryWrapper<>();
        if (status != null) {
            wrapper.eq(SysDept::getStatus, status);
        }
        wrapper.orderByAsc(SysDept::getSortOrder);
        List<SysDept> allDepts = sysDeptService.list(wrapper);
        // 构建树形结构
        List<SysDept> tree = buildTree(allDepts, 0L);
        return Result.success(tree);
    }

    private List<SysDept> buildTree(List<SysDept> depts, Long parentId) {
        return depts.stream()
                .filter(dept -> parentId.equals(dept.getParentId()))
                .peek(dept -> dept.setChildren(buildTree(depts, dept.getId())))
                .collect(Collectors.toList());
    }

    @PostMapping
    public Result<Void> save(@RequestBody SysDept dept) {
        sysDeptService.save(dept);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody SysDept dept) {
        sysDeptService.updateById(dept);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysDeptService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        sysDeptService.removeByIds(ids);
        return Result.success();
    }
}