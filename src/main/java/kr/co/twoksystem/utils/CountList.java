package kr.co.twoksystem.utils;

import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CountList<E> extends AbstractCollection<E> {
	private int totalCount;
	private List<E> data;

	public CountList() {
		super();
	}

	public CountList(List<E> data) {
		super();
		setData(data);
		setTotalCount(getData().size());
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List<E> getData() {
		return data;
	}

	public void setData(List<E> data) {
		this.data = new ArrayList<E>();
		if (data != null) {
			this.data.addAll(data);
		}
	}

	@Override
	public int size() {
		return data.size();
	}

	@Override
	public Iterator<E> iterator() {
		return data.iterator();
	}
}
