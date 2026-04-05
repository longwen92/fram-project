package com.farm.mng.common;

import lombok.Data;
import java.util.List;

/**
 * 分页响应结果
 */
@Data
public class PageResult<T> {
    private List<T> list;
    private long total;
    private int page;
    private int size;
    private int pages;

    public PageResult() {
    }

    public PageResult(List<T> list, long total, int page, int size) {
        this.list = list;
        this.total = total;
        this.page = page;
        this.size = size;
        this.pages = (int) Math.ceil((double) total / size);
    }

    public static <T> PageResult<T> of(List<T> list, long total, int page, int size) {
        return new PageResult<>(list, total, page, size);
    }

    public static <T> PageResult<T> empty(int page, int size) {
        return new PageResult<>(List.of(), 0, page, size);
    }
}