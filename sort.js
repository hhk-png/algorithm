export default function sort() {
}

sort.prototype = {

  // 三向切分的快速排序
  quick3way: function (a, lo, hi) {
    if (hi <= lo) return ;
    let it = lo, i = lo + 1, gt = hi;
    let val = a[lo];
    while (i <= gt) {
      if (a[i] < val)
        this.exchange(a, it++, i++);
      else if (a[i] > val)
        this.exchange(a, i, gt--);
      else
        i++;
    }

    this.quick3way(a, lo, it - 1);
    this.quick3way(a, gt + 1, hi);
  },

  // 标准快速排序
  quickSort: function (a) {
    this.quickSortSon(a, 0, a.length - 1);
    this.show(a)
  },
  quickSortSon: function (a, lo, hi) {
    if (hi <= lo) return ;
    // 替换成
    // if (hi <= lo + M) { Insertion.sort(a, lo, hi); return; } 
    let j = this.partition(a, lo, hi);
    this.quickSortSon(a, lo, j - 1);
    this.quickSortSon(a, j + 1, hi);
  },
  partition: function (a, lo, hi) { // 快速排序的切分
    let i = lo, j = hi + 1;
    let val = a[lo];

    while (true) {
      // a[...i] < val < a[j...]
      while (this.valueLess(a[++i], val));
        // if (i === hi) break; // 可以省略
      while (this.valueLess(val, a[--j]));
        // if (j === lo) break; // 可以省略
      if (i >= j) break;
      this.exchange(a, i, j);
    }
    this.exchange(a, lo, j);
    return j;
  },

  // 自顶向下的归并排序
  Tp2BtmSort: function (a) {
    this.Tp2BtmSortSon(a, 0, a.length - 1);
    this.show(a)
  },
  Tp2BtmSortSon: function (a, lo, hi) {
    if (hi <= lo) return ;
    let mid = lo + Math.trunc((hi - lo) / 2);
    this.Tp2BtmSortSon(a, lo, mid);
    this.Tp2BtmSortSon(a, mid + 1, hi);
    this.mergeHereSort(a, lo, mid, hi);
  },

  // 原地归并 [lo, hi]
  mergeHereSort: function (a, lo, mid, hi) {
    let i = lo; // 左边界
    let j = mid + 1; // 中间分割线
    let aux = []; // 辅助数组
    for (let k = lo; k <= hi; k++) { // 将所有元素复制到aux中，然后再归并回a中
      aux[k] = a[k];
    }
    for (let k = lo; k <= hi; k++) {
      if (i > mid) // 左边元素用尽
        a[k] = aux[j++];
      else if (j > hi) // 右边元素用尽
        a[k] = aux[i++];
      else if (this.less(aux, j, i)) // 右边的当前元素小于左边的当前元素，取右边的当前元素
        a[k] = aux[j++];
      else // 左边的当前元素小于右边的当前元素，取左边的当前元素
        a[k] = aux[i++];
    }

    // this.show(a);
  },

  // 希尔排序
  shellSort: function (a) {
    let N = a.length;
    let h = 1;
    // h递增序列
    while (h < Math.floor(N / 3)) h = 3 * h + 1; // 1, 4, 13, 40, 121, 364, 1093, ... 

    // 在插入排序的外层套了一个while循环
    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && this.less(a, j, j - h); j -= h) {
          this.exchange(a, j, j - h);
        }
      }
      h = Math.floor(h / 3);
    }

    this.show(a)
  },

  // 插入排序
  insertSort: function (a) {
    let N = a.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0 && this.less(a, j, j - 1); j--) {
        this.exchange(a, j, j - 1);
      }
    }
    this.show(a);
  },

  // 选择排序
  selectSort: function (a) {
    let N = a.length;
    for (let i = 0; i < N; i++) {
      let min = i;
      for (let j = i + 1; j < N; j++) {
        if (this.less(a, j, min))
          min = j;
      }

      this.exchange(a, i, min);
    }

    this.show(a);
  },

  // 算法所需的API
  less: function (a, i, j) {
    return a[i] < a[j];
  },

  exchange: function (a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  },

  isSorted: function (a) {
    for (let i = 1; i < a.length; i++) {
      if (this.less(a, i, i - 1))
        return false;
    }

    return true;
  },

  show: function (a) {
    console.log(a.join(' '));
  },

  valueLess: function (a, b) {
    return a < b;
  }
}

