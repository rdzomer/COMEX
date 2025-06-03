
export interface LastUpdateData {
  date: string | null;
  year: number | null;
  month: number | null;
  monthName?: string;
}

export interface NcmDetails {
  description: string | null;
  unit: string | null;
}

export interface ComexStatRecord {
  year: number;
  month?: number; // Optional for monthly data
  coNcm?: string;
  ncm?: string; // Description from API
  country?: string; // For country-specific data
  metricFOB?: number;
  metricKG?: number;
  metricStatistic?: number;
  metricFreight?: number;
  metricInsurance?: number;
  metricCIF?: number;
  [key: string]: any; // For other dynamic metrics
}

export interface ProcessedTradeData {
  year: string; // Can be "YYYY" or "YYYY (Até mês XX)"
  'Código NCM'?: string;
  'Descrição NCM'?: string; // Added for clarity
  'Unidade Estatística'?: string;
  'Exportações (US$ FOB)'?: number;
  'Exportações (KG)'?: number;
  'Exportações (Qtd Estatística)'?: number;
  'Importações (US$ FOB)'?: number;
  'Importações (KG)'?: number;
  'Importações (Qtd Estatística)'?: number;
  'Balança Comercial (FOB)'?: number;
  'Balança Comercial (KG)'?: number;
  'Balança Comercial (Qtd Estatística)'?: number;
  'Importações (CIF USD)'?: number;
  'Importações (Frete USD)'?: number;
  'Importações (Seguro USD)'?: number;
  'Preço Médio Exportação (US$ FOB/Ton)'?: number;
  'Preço Médio Importação (US$ FOB/Ton)'?: number;
  'Preço Médio Exportação (US$/Qtd Est)'?: number;
  'Preço Médio Importação (US$/Qtd Est)'?: number;
}

export type FlowType = "import" | "export";

export interface ApiFilter {
  filter: string;
  values: string[];
}

export interface Period {
  from: string; // YYYY-MM
  to: string; // YYYY-MM
}

export interface CountryDataRecord {
  country: string;
  metricFOB: number;
  metricKG: number;
  representatividadeFOB?: number;
  representatividadeKG?: number;
}

// From 20241011_NCMs-CGIM-DINTE.xlsx -> NCMs-CGIM-DINTE sheet
export interface CgimNcmInfo {
  'Departamento Responsável'?: string;
  'Coordenação-Geral Responsável'?: string;
  'Agrupamento'?: string;
  'Setores'?: string;
  'Subsetores'?: string;
  'Produtos'?: string;
}

// From 20241011_NCMs-CGIM-DINTE.xlsx -> Entity sheets (ABITAM, etc.)
export interface EntityContactInfo {
  'Aba'?: string; // Source sheet name
  'NCM'?: string;
  'Sigla Entidade'?: string;
  'Entidade'?: string;
  'Nome do Dirigente'?: string;
  'Cargo'?: string;
  'E-mail'?: string;
  'Telefone'?: string;
  'Celular'?: string;
  'Contato Importante'?: string;
  'Cargo (Contato Importante)'?: string;
  'E-mail (Contato Importante)'?: string;
  'Telefone (Contato Importante)'?: string;
  'Celular (Contato Importante)'?: string;
}

// From dados_nfe_2016_2023.xlsx
export interface NfeData {
  ano?: number;
  ncm_8d?: string;
  valor_producao?: number;
  qtd_tributavel_producao?: number;
  valor_exp?: number;
  qtd_tributavel_exp?: number;
  valor_cif_imp_dolar?: number;
  qtd_tributavel_imp?: number;
  cambio_dolar_medio?: number;
  valor_cif_imp_reais?: number;
  coeficiente_penetracao_imp_valor?: number;
  coeficiente_penetracao_imp_qtd?: number;
  coeficiente_exp_valor?: number;
  coeficiente_exp_qtd?: number;
  consumo_nacional_aparente_valor?: number;
  consumo_nacional_aparente_qtd?: number;
  disponibilidade_total_valor?: number;
  disponibilidade_total_qtd?: number;
  'Vendas internas (KG)'?: number; // This column name is from the Python script calculation
}

export interface FormattedNfeSalesData {
  ano?: number;
  'Vendas totais (Kg)'?: string | number;
  'Δ Vendas totais (%)'?: string;
  'Vendas internas (KG)'?: string | number;
  'Δ Vendas internas (%)'?: string;
  'Exportações (Kg)'?: string | number;
  'Δ Exportações (%)'?: string;
}

export interface FormattedNfeCnaData {
  ano?: number;
  'Vendas internas (KG)'?: string | number;
  'Δ Vendas internas (%)'?: string;
  'Importações (Kg)'?: string | number;
  'Δ Importações (%)'?: string;
  'CNA (Kg)'?: string | number;
  'Δ CNA (%)'?: string;
  'Coeficiente de importação (%)'?: string;
}

export interface YearSummaryData {
  'Ano': string;
  'Importações (US$ FOB)'?: number | string;
  'Var. (%) Imp (US$ FOB)'?: string;
  'Importações (kg)'?: number | string;
  'Var. (%) Imp (kg)'?: string;
  'Preço médio Importação (US$ FOB/Ton)'?: number | string;
  'Var. (%) Preço médio Imp'?: string;
  'Exportações (US$ FOB)'?: number | string;
  'Var. (%) Exp (US$ FOB)'?: string;
  'Exportações (kg)'?: number | string;
  'Var. (%) Exp (kg)'?: string;
  'Preço médio Exp (US$ FOB/Ton)'?: number | string;
  'Var. (%) Preço médio Exp'?: string;
}

// For recharts
export interface ChartDataPoint {
  name: string; // Year or Country
  value?: number;
  value2?: number;
  [key: string]: any;
}
    