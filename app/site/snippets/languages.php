<nav class="languages" role="languages">
  <ul>
    <?php foreach($site->languages() as $language): ?>
    <li<?php e($site->language() == $language, ' class="active"') ?>>
      <a href="<?php echo $page->url($language->code()) ?>">
        <?php echo html($language->code()) ?>
      </a>
    </li>
    <?php endforeach ?>
  </ul>
</nav>
