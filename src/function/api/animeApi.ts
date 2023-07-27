async function fetchAnime(body: any) {
  // Make the HTTP Api request
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body,
  });
  return res.json();
}

async function getOneAnime(id: number = 15125) {
  var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME, sort: END_DATE) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      english
      native
    }
    type
    format
    status
    season
    seasonYear
    seasonInt
    episodes
    duration
    chapters
    volumes
    description
    coverImage {
        color
        medium
        large
        extraLarge
    }
    bannerImage
    genres
    trailer {
        id
        site
        thumbnail
    }
    source
    averageScore
    meanScore
    popularity
  }
}
`;

  // Define our query variables and values that will be used in the query request
  var variables = {
    id: id,
  };
  const bodyP = JSON.stringify({
    query: query,
    variables: variables,
  });
  const fetch = await fetchAnime(bodyP);
  return fetch.data;
}
async function getAnimePages({
  search = "",
  page = 1,
  perPage = 3,
}: {
  search: string;
  page: number;
  perPage: number;
}) {
  var query = `
query ($id: Int, $page: Int, $perPage: Int${
    search ? ", $search: String" : ""
  }) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id${search ? ", search: $search" : ""}, sort: END_DATE) {
      id
      title {
        english
        native
      }
      description
      coverImage {
        color
        medium
        large
        extraLarge
    }
    }
  }
}
`;

  var variables = {
    search: search,
    page: page,
    perPage: perPage,
  };
  const bodyP = JSON.stringify({
    query: query,
    variables: variables,
  });
  const fetch = await fetchAnime(bodyP);
  return fetch.data;
}

export { getOneAnime, getAnimePages };
