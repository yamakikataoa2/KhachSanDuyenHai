<?php
$screens = [
    'ComboDetailPage' => 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJhMzExYmM3MjY2NDQ5OGI4NGI1ZmE4Y2FhMzE5ZjQzEgsSBxCNiszR-h4YAZIBIwoKcHJvamVjdF9pZBIVQhMzMjE1MDAxMjQ4NDQ0NTU0NjA0&filename=&opi=89354086',
    'BookingPage' => 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FlMjliYjg5NTllODQwMTU4MTYyYWZiMmI5NTliZWJiEgsSBxCNiszR-h4YAZIBIwoKcHJvamVjdF9pZBIVQhMzMjE1MDAxMjQ4NDQ0NTU0NjA0&filename=&opi=89354086',
    'CustomerAccountPage' => 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ3ZDZlYWYyMzBkNTQzMDRhZGI5NThkZTZkYWUyY2I2EgsSBxCNiszR-h4YAZIBIwoKcHJvamVjdF9pZBIVQhMzMjE1MDAxMjQ4NDQ0NTU0NjA0&filename=&opi=89354086',
    'AdminDashboardPage' => 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MxMWUzOTU3MWZjYjQxOTdhMDYxYWI3NmVkZmNiNTZhEgsSBxCNiszR-h4YAZIBIwoKcHJvamVjdF9pZBIVQhMzMjE1MDAxMjQ4NDQ0NTU0NjA0&filename=&opi=89354086'
];

foreach ($screens as $name => $url) {
    echo "Downloading $name...\n";
    $html = file_get_contents($url);
    if (!$html) {
        echo "Failed to fetch $name\n";
        continue;
    }
    
    // Extract body
    preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $matches);
    $body = $matches[1] ?? '';

    // Basic conversions for JSX
    $body = str_replace('class=', 'className=', $body);
    $body = preg_replace('/<img([^>]+[^\/])>/i', '<img$1 />', $body);
    $body = preg_replace('/<input([^>]+[^\/])>/i', '<input$1 />', $body);
    $body = str_replace(['<br>', '<hr>'], ['<br />', '<hr />'], $body);
    $body = str_replace('<!--', '{/* ', $body);
    $body = str_replace('-->', ' */}', $body);

    $jsx = "import React from 'react';\n\nexport default function {$name}() {\n  return (\n    <div className=\"bg-background text-on-surface min-h-screen overflow-x-hidden\">\n      $body\n    </div>\n  );\n}\n";

    file_put_contents(__DIR__ . "/src/pages/{$name}.jsx", $jsx);
}
echo "All screens converted.\n";
