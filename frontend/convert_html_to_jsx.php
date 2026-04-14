<?php
$html = file_get_contents(__DIR__ . '/home.html');

// Extract body
preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $matches);
$body = $matches[1] ?? '';

// Basic conversions for JSX
$body = str_replace('class=', 'className=', $body);
$body = preg_replace('/<img([^>]+[^\/])>/i', '<img$1 />', $body);
$body = preg_replace('/<input([^>]+[^\/])>/i', '<input$1 />', $body);
$body = str_replace('<!--', '{/* ', $body);
$body = str_replace('-->', ' */}', $body);

$jsx = "import React from 'react';\n\nexport default function HomePage() {\n  return (\n    <div className=\"bg-background text-on-surface\">\n      $body\n    </div>\n  );\n}\n";

if (!is_dir(__DIR__ . '/src/pages')) mkdir(__DIR__ . '/src/pages', 0777, true);
file_put_contents(__DIR__ . '/src/pages/HomePage.jsx', $jsx);
echo "Converted to HomePage.jsx";
