package com.farm.mng.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.farm.mng.common.PageResult;
import com.farm.mng.common.Result;
import com.farm.mng.entity.CmsCategory;
import com.farm.mng.service.ICmsCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 内容分类控制器
 */
@RestController
@RequestMapping("/cms/category")
public class CmsCategoryController {

    @Autowired
    private ICmsCategoryService cmsCategoryService;

    @GetMapping("/{id}")
    public Result<CmsCategory> getById(@PathVariable Long id) {
        CmsCategory category = cmsCategoryService.getById(id);
        return Result.success(category);
    }

    @GetMapping("/page")
    public Result<PageResult<CmsCategory>> page(@RequestParam(defaultValue = "1") Integer pageNum,
                                                @RequestParam(defaultValue = "10") Integer pageSize,
                                                @RequestParam(required = false) String categoryName,
                                                @RequestParam(required = false) String categoryCode,
                                                @RequestParam(required = false) Integer status) {
        Page<CmsCategory> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<CmsCategory> wrapper = new LambdaQueryWrapper<>();
        if (categoryName != null && !categoryName.trim().isEmpty()) {
            wrapper.like(CmsCategory::getCategoryName, categoryName);
        }
        if (categoryCode != null && !categoryCode.trim().isEmpty()) {
            wrapper.like(CmsCategory::getCategoryCode, categoryCode);
        }
        if (status != null) {
            wrapper.eq(CmsCategory::getStatus, status);
        }
        wrapper.orderByAsc(CmsCategory::getSortOrder);
        IPage<CmsCategory> result = cmsCategoryService.page(page, wrapper);
        PageResult<CmsCategory> pageResult = new PageResult<>(
                result.getRecords(), result.getTotal(), result.getSize(), result.getCurrent());
        return Result.success(pageResult);
    }

    @GetMapping("/list")
    public Result<List<CmsCategory>> list(@RequestParam(required = false) Integer status) {
        LambdaQueryWrapper<CmsCategory> wrapper = new LambdaQueryWrapper<>();
        if (status != null) {
            wrapper.eq(CmsCategory::getStatus, status);
        }
        wrapper.orderByAsc(CmsCategory::getSortOrder);
        List<CmsCategory> list = cmsCategoryService.list(wrapper);
        return Result.success(list);
    }

    @PostMapping
    public Result<Void> save(@RequestBody CmsCategory category) {
        cmsCategoryService.save(category);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody CmsCategory category) {
        cmsCategoryService.updateById(category);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        cmsCategoryService.removeById(id);
        return Result.success();
    }

    @PostMapping("/batchDelete")
    public Result<Void> batchDelete(@RequestBody List<Long> ids) {
        cmsCategoryService.removeByIds(ids);
        return Result.success();
    }
}