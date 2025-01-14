import { DepartmentICU } from '@/types/department';
import { Procedure } from '@/types/medical-care-template';

// NICUによる処置
export const proceduresByICU: Procedure[] = [
  // CPA覚知/初動
  {
    label: 'コードブルー宣言による呼び出し',
    details: 'A6病棟へ',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: 'コマンダー変更',
    details: '産科医師から引き継ぐ',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: '呼吸',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: '脈拍',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: '意識障害',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: 'BVM継続',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: 'CPR継続',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: '気管挿管',
    details: '',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: 'アドレナリン1mg',
    details: '4分間隔',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  {
    label: '他オーダー',
    details: '産科医ができていない場合,輸血オーダー',
    department: DepartmentICU,
    phase: 'CPA覚知/初動',
  },
  // PMCD準備
  {
    label: 'ROSCチェック',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC 無→PMCD宣言',
    details: '産科医師、CCMC医師どちらかが行う',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC有',
    details: 'PMCD不要宣言。NRFS、子癇はgradeA帝王切開',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'PMCD確定コール',
    details: 'PMCDに向けて動く',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'A6から手術室への移動',
    details: '分娩台またはストレッチャー',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'AED携帯',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'BVM継続',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'CPR継続',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: '手術室搬入後麻酔科へ引き継ぎ',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: '追加ライン確保（静脈、動脈）',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: '必要薬剤、物品確認',
    details: '具体的には？',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  {
    label: 'DC準備',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD準備',
  },
  // PMCD実施
  {
    label: '妊婦が手術室へ移動',
    details: '原則9番手術室',
    department: DepartmentICU,
    phase: 'PMCD実施',
  },
  {
    label: 'PMCD開始宣言',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD実施',
  },
  {
    label: '胎児娩出',
    details: '',
    department: DepartmentICU,
    phase: 'PMCD実施',
  },
];
