<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import ShareIcon from './icons/IconShare.vue'
import SupportIcon from './icons/IconSupport.vue'
import SearchIcon from './icons/IconSearch.vue'
import CopyIcon from './icons/IconCopy.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <SearchIcon />
    </template>
    <template #heading>Search</template>
    <template #task>
      <p>
        Enter a International Standard Book Number (ISBN). A 13-digit ISBN,
        <code>978-0-345-39180-3</code>, usually represented by an EAN-13 bar code on the back of
        your book.
      </p>
    </template>
    <template #hint>
      <p>You can use your Mobile Camera to scan and share the code to this app.</p>
    </template>
    <template #info>
      <h3>Progressiv Web App (PWA)</h3>
      <p>
        If you install this PWA on your phone, you can scan the ISBN code from the back of your book
        with your Camera and directly share it to this app.
      </p>
      <h3>International Standard Book Number (ISBN)</h3>
      <p>
        For more than thirty years, ISBNs were 10 digits long. On January 1, 2007 the ISBN system
        switched to a 13-digit format.
      </p>
      <p>
        Now all ISBNs are 13-digits long. If you were assigned 10-digit ISBNs, you can convert them
        to the 13-digit format at the
        <a title="ISBN Calculator" href="https://www.isbn-international.org/content/isbn-calculator"
          >converter</a
        >
        found on the ISBN website.
      </p>
      <p>
        The ISBN website provide a
        <a
          href="https://www.isbn-international.org/content/isbn-users-manual/29"
          title="ISBN Manual"
          >Users' Manuals</a
        >
      </p>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CopyIcon />
    </template>
    <template #heading> Copy </template>
    <template #task>
      <p>
        Copy the book information from the search result to your clipboard and past it into your
        note app or share it with friends.
      </p>
    </template>
    <template #hint
      >By pressing the Copy button, the book title, author, description and image will be copied to
      your clipboard</template
    >
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ShareIcon />
    </template>
    <template #heading> Share </template>
    <template #task
      >Share the book information from the search result to your favorite app.</template
    >
    <template #hint>
      <p>
        By pressing the Share button, you are able to share a link or the results directly to your
        favorite app.
      </p>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading> Community </template>

    <template #task>
      <p>
        Join the community and share your book with others. You can also find books from other
        people.
      </p>
    </template>

    <template #hint>
      <p>Share your book with the hashtag <code>#book_link</code> on your favorite social media</p>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading> Support </template>
    <template #task>
      <p>Read the books you love.</p>
      <p>Share the books you love to your friends.</p>
      <p>Share the books you read on your favorite social media.</p>
      <p>Star this project on github.</p>
      <p>Share this website</p>
    </template>
  </WelcomeItem>
</template>
