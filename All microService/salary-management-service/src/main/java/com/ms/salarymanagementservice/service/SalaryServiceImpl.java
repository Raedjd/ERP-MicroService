package com.ms.salarymanagementservice.service;

import com.ms.salarymanagementservice.models.Salary;
import com.ms.salarymanagementservice.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryServiceImpl implements ISalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Override
    public Salary addSalary(Salary salary) {

        salary.setGrossPay(salary.getBonus()+ salary.getOtherPayement()+salary.getBasicSalary()+salary.getOverTime());
        salary.setDeducations(salary.getOtherDecuctions()+ salary.getTax());
        salary.setNetPay(salary.getGrossPay()+ salary.getOtherDecuctions());
        return salaryRepository.save(salary);
    }

    @Override
    public List<Salary> findAll() {
        return salaryRepository.findAll();
    }

    @Override
    public Salary findSalaryById(Long idSalary) {
        return salaryRepository.findById(idSalary).get();
    }

    @Override
    public List<Salary> findSalaryByUserId(String userId){
        return salaryRepository.findAllByUserId(userId);
    }

    @Override
    public Salary updateSalary(Salary salary, Long id) {
        if (salaryRepository.findById(id).isPresent()) {
            Salary s = salaryRepository.findById(id).get();
            s.setGrossPay(salary.getBonus()+ salary.getOtherPayement()+salary.getBasicSalary()+salary.getOverTime());
            s.setDeducations(salary.getOtherDecuctions()+ salary.getTax());
            s.setNetPay(salary.getGrossPay()+ salary.getOtherDecuctions());
            s.setDate(salary.getDate());
            s.setBonus(salary.getBonus());
            s.setBasicSalary(salary.getBasicSalary());
            s.setTax(salary.getTax());
            s.setDeducations(salary.getDeducations());
            s.setOtherDecuctions(salary.getOtherDecuctions());
            s.setOtherPayement(salary.getOtherPayement());
            return salaryRepository.save(s);
        }
        return null;
    }

    @Override
    public void deleteSalary(Long id) {
        salaryRepository.deleteById(id);
    }

}
