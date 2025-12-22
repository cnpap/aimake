<?php

namespace Database\Seeders;

use App\Models\Dimension;
use App\Models\DimensionAttribute;
use Illuminate\Database\Seeder;

class DimensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dimensions = [
            [
                'slug' => 'person_identity',
                'name' => '个人身份维度',
                'is_composite' => false,
                'key_examples' => [
                    ['id_number' => '330102199001011234'],
                ],
                'keys' => [
                    ['scope' => 'self', 'field' => 'id_number'],
                ],
                'description' => '以身份证件号码为唯一键，承载核心个人基础信息。',
                'attributes' => [
                    ['code' => 'id_number', 'label' => '身份证件号码', 'data_type' => 'string', 'is_key_component' => true, 'description' => '居民身份证号码，15 或 18 位，末位可为数字或大写/小写 X，作为唯一主键；不包含空格或分隔符。', 'sample_value' => '330102199001011234', 'rules' => 'required|string|min:15|max:18'],
                    ['code' => 'full_name', 'label' => '姓名', 'data_type' => 'string', 'description' => '真实姓名，全称，需与证件一致，保留中文或英文全名，不含空格以外的特殊字符。', 'sample_value' => '张三', 'rules' => 'required|string|max:64'],
                    ['code' => 'id_type', 'label' => '证件类型', 'data_type' => 'string', 'description' => '证件种类，字母枚举：sfz(身份证)/hz(护照)/gatxz(港澳通行证)/tbz(台胞证)/jgz(军官证)/qt(其他)。', 'sample_value' => 'sfz', 'rules' => 'nullable|in:sfz,hz,gatxz,tbz,jgz,qt'],
                    ['code' => 'former_name', 'label' => '曾用名', 'data_type' => 'string', 'description' => '历史姓名或曾用名，如无可留空。', 'sample_value' => '张小三', 'rules' => 'nullable|string|max:64'],
                    ['code' => 'gender', 'label' => '性别', 'data_type' => 'string', 'is_derived' => true, 'description' => '性别代码，M 表示男性，F 表示女性；可为空表示未知，由身份证号奇偶位派生。', 'sample_value' => 'M', 'rules' => 'nullable|in:M,F'],
                    ['code' => 'birth_date', 'label' => '出生日期', 'data_type' => 'date', 'is_derived' => true, 'description' => '完整出生日期，格式 YYYY-MM-DD，由身份证号日期字段派生。', 'sample_value' => '1990-01-01', 'rules' => 'nullable|date'],
                    ['code' => 'birth_year', 'label' => '出生年份', 'data_type' => 'integer', 'is_derived' => true, 'description' => '四位数字年份，例如 1990，由身份证号日期字段派生。', 'sample_value' => 1990, 'rules' => 'nullable|integer|digits:4'],
                    ['code' => 'birth_month', 'label' => '出生月份', 'data_type' => 'integer', 'is_derived' => true, 'description' => '1-12 的月份数字，由身份证号日期字段派生。', 'sample_value' => 1, 'rules' => 'nullable|integer|min:1|max:12'],
                    ['code' => 'birth_day', 'label' => '出生日', 'data_type' => 'integer', 'is_derived' => true, 'description' => '1-31 的日数字，对应出生月份的有效日期，由身份证号日期字段派生。', 'sample_value' => 1, 'rules' => 'nullable|integer|min:1|max:31'],
                    ['code' => 'ethnicity', 'label' => '民族', 'data_type' => 'string', 'description' => '民族中文全称，如 汉族、藏族、回族；建议使用国家统计局标准名称。', 'sample_value' => '汉族', 'rules' => 'nullable|string|max:32'],
                    ['code' => 'nationality', 'label' => '国籍', 'data_type' => 'string', 'description' => '国籍/地区名称，推荐中文全称（如 中国）；如业务要求英文，可填写英文名称（如 China），需全库保持一致。', 'sample_value' => '中国', 'rules' => 'nullable|string|max:64'],
                    ['code' => 'political_status', 'label' => '政治面貌', 'data_type' => 'string', 'description' => '政治身份，字母枚举：ccp(中共党员)/ccpp(中共预备党员)/league(共青团员)/mass(群众)/dem(民主党派)/other(其他)。', 'sample_value' => 'ccp', 'rules' => 'nullable|in:ccp,ccpp,league,mass,dem,other'],
                    ['code' => 'religion', 'label' => '宗教信仰', 'data_type' => 'string', 'description' => '宗教信仰，字母枚举：fo(佛教)/jdj(基督教)/tzj(天主教)/yslj(伊斯兰教)/dj(道教)/none(无宗教信仰)/other(其他)。', 'sample_value' => 'none', 'rules' => 'nullable|in:fo,jdj,tzj,yslj,dj,none,other'],
                    [
                        'code' => 'contact_addresses',
                        'label' => '联系地址列表',
                        'data_type' => 'json',
                        'description' => 'JSON 数组，每项包含：address_label(标签，如 家庭/工作)、full_address(详细地址)、region_code(6 位行政区划码)、postal_code(邮编)。字段全为字符串，示例见 sample_value。',
                        'sample_value' => '[{"address_label":"家庭","full_address":"四川省南充市顺庆区XX路1号","region_code":"511302","postal_code":"637000"}]',
                        'rules' => 'nullable|json',
                    ],
                ],
            ],
            [
                'slug' => 'contact_phone',
                'name' => '电话联系方式维度',
                'is_composite' => true,
                'key_examples' => [
                    ['id_number' => '330102199001011234', 'phone_number' => '13800001111'],
                ],
                'keys' => [
                    ['scope' => 'parent', 'dimension' => 'person_identity', 'field' => 'id_number'],
                    ['scope' => 'self', 'field' => 'phone_number'],
                ],
                'description' => '身份证与手机号联合组成唯一联系方式维度，上级键来源于身份维度。',
                'attributes' => [
                    ['code' => 'phone_number', 'label' => '手机号', 'data_type' => 'string', 'is_key_component' => true, 'description' => '大陆 11 位数字手机号，不含国家码与分隔符；可用于短信或风控。', 'sample_value' => '13800001111', 'rules' => 'required|string|size:11'],
                    ['code' => 'phone_location', 'label' => '号段归属地', 'data_type' => 'string', 'description' => '号段归属省市中文全称，如 “四川省南充市”；未知可留空。', 'sample_value' => '四川省南充市', 'rules' => 'nullable|string|max:64'],
                    ['code' => 'phone_carrier', 'label' => '运营商', 'data_type' => 'string', 'description' => '运营商字母枚举：dx(电信)/yd(移动)/lt(联通)/wz(未知)，需与号段匹配，不使用数字。', 'sample_value' => 'yd', 'rules' => 'nullable|in:dx,yd,lt,wz'],
                    ['code' => 'phone_label', 'label' => '号码标签', 'data_type' => 'string', 'description' => '号码用途标签，如 家庭/本人/公司/紧急联系人，可自定义中文。', 'sample_value' => '本人', 'rules' => 'nullable|string|max:32'],
                ],
            ],
            [
                'slug' => 'social_insurance_settlement',
                'name' => '社保结算维度',
                'is_composite' => true,
                'key_examples' => [
                    ['id_number' => '330102199001011234', 'settlement_id' => 'SETTLE-001'],
                ],
                'keys' => [
                    ['scope' => 'parent', 'dimension' => 'person_identity', 'field' => 'id_number'],
                    ['scope' => 'self', 'field' => 'settlement_id'],
                ],
                'description' => '医保、社保结算类记录独立维度化，避免与身份或联系方式混用字段。',
                'attributes' => [
                    ['code' => 'settlement_id', 'label' => '结算ID', 'data_type' => 'string', 'is_key_component' => true, 'description' => '业务结算单号，字符串主键，保持唯一且可追溯原始系统。', 'sample_value' => 'SETTLE-001', 'rules' => 'required|string|max:64'],
                    ['code' => 'settlement_category', 'label' => '结算类别', 'data_type' => 'string', 'description' => '结算类型，字母枚举：mz(门诊)/zy(住院)/gy(购药)/qt(其他)。', 'sample_value' => 'mz', 'rules' => 'nullable|in:mz,zy,gy,qt'],
                    ['code' => 'organization_code', 'label' => '机构编号', 'data_type' => 'string', 'description' => '医疗或社保机构编码，可为统一社会信用代码或内部编号。', 'sample_value' => '91510100MA6XXXXXX', 'rules' => 'nullable|string|max:64'],
                    ['code' => 'organization_name', 'label' => '机构名称', 'data_type' => 'string', 'description' => '机构中文全称，与结算来源一致。', 'sample_value' => '四川省人民医院', 'rules' => 'nullable|string|max:128'],
                    ['code' => 'fund_total', 'label' => '基金支付总额', 'data_type' => 'decimal', 'description' => '基金支付金额（元），精确到分，可为空表示未知。', 'sample_value' => '1234.56', 'rules' => 'nullable|numeric'],
                    ['code' => 'medical_total', 'label' => '医疗费总额', 'data_type' => 'decimal', 'description' => '医疗费用总额（元），精确到分。', 'sample_value' => '2345.67', 'rules' => 'nullable|numeric'],
                    ['code' => 'settlement_time', 'label' => '结算时间', 'data_type' => 'datetime', 'description' => '结算发生时间，格式 YYYY-MM-DD HH:MM:SS。', 'sample_value' => '2024-01-01 10:00:00', 'rules' => 'nullable|date'],
                ],
            ],
            [
                'slug' => 'housing_fund_account',
                'name' => '公积金账户维度',
                'is_composite' => true,
                'key_examples' => [
                    ['id_number' => '330102199001011234', 'personal_account' => '32000019890001'],
                ],
                'keys' => [
                    ['scope' => 'parent', 'dimension' => 'person_identity', 'field' => 'id_number'],
                    ['scope' => 'self', 'field' => 'personal_account'],
                ],
                'description' => '公积金账户与缴存明细独立维度，便于跨表关联与血缘追踪。',
                'attributes' => [
                    ['code' => 'personal_account', 'label' => '个人账号', 'data_type' => 'string', 'is_key_component' => true, 'description' => '公积金个人账号，字符串主键，与账户一一对应。', 'sample_value' => '32000019890001', 'rules' => 'required|string|max:64'],
                    ['code' => 'deposit_organization', 'label' => '缴存单位', 'data_type' => 'string', 'description' => '缴存单位中文全称，通常为雇主名称。', 'sample_value' => '四川数科有限公司', 'rules' => 'nullable|string|max:128'],
                    ['code' => 'deposit_amount', 'label' => '缴存金额', 'data_type' => 'decimal', 'description' => '本次缴存金额（元），精确到分。', 'sample_value' => '1500.00', 'rules' => 'required|numeric'],
                    ['code' => 'posting_date', 'label' => '记账日期', 'data_type' => 'date', 'description' => '缴存记账日期，格式 YYYY-MM-DD。', 'sample_value' => '2024-01-15', 'rules' => 'required|date'],
                ],
            ],
        ];

        foreach ($dimensions as $dimensionData) {
            $attributes = $dimensionData['attributes'];
            unset($dimensionData['attributes']);

            $dimension = Dimension::query()->updateOrCreate(
                ['slug' => $dimensionData['slug']],
                $dimensionData
            );

            foreach ($attributes as $index => $attribute) {
                DimensionAttribute::query()->updateOrCreate(
                    ['code' => $attribute['code']],
                    [
                        ...$attribute,
                        'dimension_id' => $dimension->id,
                        'position' => $attribute['position'] ?? $index + 1,
                    ]
                );
            }
        }
    }
}
