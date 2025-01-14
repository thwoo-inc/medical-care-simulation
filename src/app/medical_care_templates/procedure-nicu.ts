import { DepartmentNICU } from '@/types/department';
import { Procedure } from '@/types/medical-care-template';

// NICUによる処置
export const proceduresByNICU: Procedure[] = [
  // PMCD想定緊急連絡
  {
    label: 'NICU医師コール',
    details: '75217',
    department: DepartmentNICU,
    phase: 'PMCD想定緊急連絡',
  },
  {
    label: 'NICU他医師コール',
    details: '手が空いている医師は産科を手伝う',
    department: DepartmentNICU,
    phase: 'PMCD想定緊急連絡',
  },
  {
    label: '妊娠週数確認',
    details: '24週以降',
    department: DepartmentNICU,
    phase: 'PMCD想定緊急連絡',
  },
  // PMCD準備
  {
    label: 'ROSCチェック',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC 無→PMCD宣言',
    details: '産科医師、CCMC医師どちらかが行う',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC有',
    details: 'PMCD不要宣言。NRFS、子癇はgradeA帝王切開',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'PMCD確定コール',
    details: 'PMCDに向けて動く',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'PMCD決定、実施のコールあり',
    details: '手術決定',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'PMCD決定、助産師→NICUスタッフへ連絡',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: '蘇生物品確認',
    details: '詳細はNICU医師へお任せ',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: 'クベース移動',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  {
    label: '新生児受け入れ準備',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD準備',
  },
  // PMCD実施
  {
    label: '妊婦が手術室へ移動',
    details: '原則9番手術室',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: 'PMCD開始宣言',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: '胎児娩出',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: '児を産科医師から受け取る',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: 'NCPR',
    details: '人工呼吸、胸骨圧迫、気管挿管',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: 'アドレナリン投与',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: 'クベース収容',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
  {
    label: 'NICUへ収容',
    details: '',
    department: DepartmentNICU,
    phase: 'PMCD実施',
  },
];
