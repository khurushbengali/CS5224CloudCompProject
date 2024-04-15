## Notebooks

### cloudcomp_project.ipynb
Initial EDA and preprocessing on the data to create `NLB_updated.csv`. This is currently located under `backend/resources`

### TranslateGPT.ipynb
Intermediate notebook to use GPT to translate non english columns for recommendations

### Recommendation.ipynb
Notebook that use a pretrained word2vec model to produce content based recomendations for our catalog. The output csv is `recommendation.csv`, currently located under `backend/resources`

### Process Data For DB.ipynb
Read both the csv files and do light processing to format into dynamodb ingestible csv format. This produced `books.csv`, `book_info.csv`, `recommendations.csv`, located under `db/resources`.
