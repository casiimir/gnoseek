interface Image {
  newsUrl: string;
  source: string;
  imgUrl: string;
}

interface Article {
  articleTitle: string;
  url: string;
  source: string;
  time: string;
  snippet: string;
}

interface TrendingStories {
  image: Image;
  shareUrl: string;
  articles: Article[];
  idsForDedup: string[];
  id: string;
  title: string;
  entityNames: string[];
}

interface MyDataType {
  featuredStoryIds: string[];
  trendingStoryIds: string[];
  storySummaries: {
    featuredStories: any;
    trendingStories: TrendingStories[];
  };
  date: string;
  hideAllImages: boolean;
}

declare module "google-trends-api" {
  export interface MyLibraryInterface {
    realTimeTrends(
      arg0: { geo: string; hl: string; category: string },
      arg1: (results: string, err: any) => any
    ): Promise<MyDataType>;
  }

  const myLibrary: MyLibraryInterface;
  export default myLibrary;
}
