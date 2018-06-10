import { GetKpi } from '../../../application/kpi'

class KpiController {
  constructor() {}
  async getKpi(req, res) {
    const resultKpi = await GetKpi.getKpiFromIdService(req.params.idService)
    return res.send(resultKpi).json()
  }
}

export default new KpiController()
