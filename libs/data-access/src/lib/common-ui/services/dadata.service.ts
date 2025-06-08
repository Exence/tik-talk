import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map } from 'rxjs'
import { DADATA_API_TOKEN } from '../constants/dadata-api-token.constant'
import { DadataAddressSuggestion } from '../intrerfaces/dadata.interface'

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  #httpClient = inject(HttpClient)

  #addressApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

  getAddresSuggestions(query: string | null) {
    return this.#httpClient
      .post<{ suggestions: { data: DadataAddressSuggestion }[] }>(
        this.#addressApi,
        { query },
        { headers: { Authorization: `Token ${DADATA_API_TOKEN}` } }
      )
      .pipe(map((res) => res.suggestions.map((s) => s.data)))
  }
}
