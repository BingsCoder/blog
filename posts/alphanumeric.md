# alphanumeric 是什么意思？

**alphanumeric**（字母数字）是一个英文术语，指**同时包含字母（A–Z、a–z）和数字（0–9）的字符集合**。

## 词源拆解

| 部分 | 含义 |
|------|------|
| alpha | 来自 *alphabetic*，即字母 |
| numeric | 来自 *numerical*，即数字 |

两者合并，就得到了 **alphanumeric**。

## 常见用法

### 1. 密码/PIN 码
> "请设置一个至少 8 位的 alphanumeric 密码。"

即密码必须同时含有字母和数字，例如：`Pass1234`、`abc123xyz`。

### 2. 验证码（CAPTCHA）
网站常用 alphanumeric 字符生成图片验证码，例如：`A3fK9p`。

### 3. 编程与正则表达式
在正则表达式中，`[a-zA-Z0-9]` 表示一个 alphanumeric 字符。

```python
import re

def is_alphanumeric(s):
    return bool(re.fullmatch(r'[a-zA-Z0-9]+', s))

print(is_alphanumeric("Hello123"))  # True
print(is_alphanumeric("Hello!"))    # False（含特殊字符）
```

### 4. 产品编号 / 序列号
许多产品序列号采用 alphanumeric 格式，例如：`SN-AB12CD34`。

## 总结

> **alphanumeric = 字母 + 数字**
>
> 只要一个字符串或字符集同时涉及英文字母与阿拉伯数字，就可以用 alphanumeric 来描述它。
