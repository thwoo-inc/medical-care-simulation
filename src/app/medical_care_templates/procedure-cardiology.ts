import { DepartmentCardiology } from '@/types/department';
import { Procedure } from '@/types/medical-care-template';

// 循環器内科による処置
export const proceduresByCardiology: Procedure[] = [
  // PMCD準備
  {
    label: '妊婦心肺停止事例発生で74025に連絡あり',
    details: 'ＰＣＰＳの可能性を念頭に動く',
    department: DepartmentCardiology,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSCチェック',
    details: '',
    department: DepartmentCardiology,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC 無→PMCD宣言',
    details: '産科医師、CCMC医師どちらかが行う',
    department: DepartmentCardiology,
    phase: 'PMCD準備',
  },
  {
    label: 'ROSC有',
    details: 'PMCD不要宣言\nNRFS、子癇はgradeA帝王切開',
    department: DepartmentCardiology,
    phase: 'PMCD準備',
  },
  {
    label: 'PMCD確定コール',
    details: 'PMCDに向けて動く',
    department: DepartmentCardiology,
    phase: 'PMCD準備',
  },
  // PCPS
  {
    label: 'PCPS準備物品',
    details: '妊婦心肺停止の連絡後準備開始',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: '回路組み立て',
    details: 'プライミング',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: 'PCPS開始',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: '術野確保',
    details: '水平開脚位？',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: 'PCPS機械だし',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: '機械準備',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: 'CPR中止',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: '出血に対するvolume投与',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
  {
    label: '低体温療法',
    details: '',
    department: DepartmentCardiology,
    phase: 'PCPS',
  },
];
