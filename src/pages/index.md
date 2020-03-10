---
title: COVID Canada
eleventyExcludeFromCollections: true
permalink: /
layout: layouts/base.liquid
---

{% assign recentStats = stats | reverse %}

| DATE | CONFIRMED | DEATHS | RECOVERED |
|:-----|----------:|-------:|----------:|
{%- for data in recentStats %}
| [{{ data.date }}](pages/{{ data.date}}/) | {{ data.stats.Confirmed }} | {{ data.stats.Deaths }} | {{ data.stats.Recovered }} |
{%- endfor %}
